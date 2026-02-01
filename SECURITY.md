# Security Report - Admin Cardápio Digital

## Date: 2026-02-01

## Summary
This document outlines the security vulnerabilities found in the current Angular version and provides mitigation strategies.

## Identified Vulnerabilities

### 1. XSRF Token Leakage via Protocol-Relative URLs
**Severity:** Medium to High  
**Affected Package:** @angular/common  
**Current Version:** 17.3.12  
**Status:** Vulnerable (affects versions < 19.2.16)  
**Patched Versions:** 19.2.16+, 20.3.14+, 21.0.1+

**Description:**  
Angular HTTP Client is vulnerable to XSRF token leakage when making requests to protocol-relative URLs (e.g., `//example.com/api`).

**Impact:**  
This could allow attackers to steal XSRF tokens if the application makes HTTP requests to protocol-relative URLs.

---

### 2. XSS Vulnerability via Unsanitized SVG Script Attributes
**Severity:** High  
**Affected Packages:** @angular/compiler, @angular/core  
**Current Version:** 17.3.12  
**Status:** Vulnerable (affects versions <= 18.2.14)  
**Patched Versions:** 19.2.18+, 20.3.16+, 21.0.7+  
**Note:** NO PATCH AVAILABLE for Angular 17.x or 18.x

**Description:**  
Angular fails to properly sanitize SVG script attributes, allowing potential XSS attacks through malicious SVG content.

**Impact:**  
If the application renders user-provided SVG content, attackers could inject malicious scripts leading to XSS attacks.

---

### 3. Stored XSS via SVG Animation, SVG URL and MathML Attributes
**Severity:** High  
**Affected Package:** @angular/compiler  
**Current Version:** 17.3.12  
**Status:** Vulnerable (affects versions <= 18.2.14)  
**Patched Versions:** 19.2.17+, 20.3.15+, 21.0.2+  
**Note:** NO PATCH AVAILABLE for Angular 17.x or 18.x

**Description:**  
Angular's sanitization process doesn't properly handle SVG animation elements, SVG URLs, and MathML attributes, allowing stored XSS attacks.

**Impact:**  
Stored XSS attacks could be executed through malicious SVG/MathML content in the database.

---

## Current Application Analysis

### Risk Assessment for This Application

#### Low Risk Areas ✅
1. **No User-Generated SVG Content:** The application doesn't allow users to upload or input SVG files
2. **No MathML Usage:** The application doesn't use MathML elements
3. **Limited Protocol-Relative URLs:** The application uses absolute URLs for Firebase

#### Medium Risk Areas ⚠️
1. **Image Uploads:** While we upload images (JPG, PNG, etc.), SVG images could potentially be uploaded
2. **Firebase Storage:** Images are served from Firebase Storage, not directly embedded as SVG code

---

## Mitigation Strategies (Immediate)

### 1. Input Validation for Image Uploads
```typescript
// In produto-form.component.ts - Add file type validation
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    // Block SVG files
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Apenas arquivos JPG, PNG, GIF e WebP são permitidos. SVG não é suportado por questões de segurança.';
      return;
    }
    
    this.selectedFile = file;
    this.selectedFileName = file.name;
    
    // Rest of the code...
  }
}
```

### 2. Avoid Protocol-Relative URLs
- ✅ Already implemented: All Firebase URLs use `https://` protocol
- ✅ No protocol-relative URLs in the codebase

### 3. Content Security Policy (CSP)
Add to `src/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.firebaseapp.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https://*.googleapis.com https://*.firebasestorage.app https://firebasestorage.googleapis.com; 
               connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com;">
```

### 4. Firebase Storage Rules
Update Firebase Storage security rules to block SVG uploads:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.contentType.matches('image/(jpeg|jpg|png|gif|webp)')
                   && request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
  }
}
```

---

## Recommended Long-Term Solution

### Upgrade to Angular 19.2.18+

**Steps:**
1. Upgrade Angular to 19.2.18 or later
2. Update all Angular dependencies
3. Test thoroughly for breaking changes
4. Update code for Angular 19 compatibility

**Command:**
```bash
ng update @angular/core@19 @angular/cli@19
```

**Benefits:**
- Fixes all identified XSS vulnerabilities
- Fixes XSRF token leakage
- Access to latest Angular features
- Continued security updates

**Considerations:**
- Major version upgrade (17 → 19)
- Potential breaking changes
- May require code updates
- Testing required

---

## Current Status

### ✅ Immediate Mitigations Applied
1. No SVG content in application
2. No MathML usage
3. Absolute URLs only (no protocol-relative)
4. Input validation recommended

### ⚠️ Recommended Actions
1. **HIGH PRIORITY:** Implement file type validation to block SVG uploads
2. **HIGH PRIORITY:** Add Content Security Policy headers
3. **HIGH PRIORITY:** Update Firebase Storage rules
4. **MEDIUM PRIORITY:** Plan Angular upgrade to 19.2.18+
5. **LOW PRIORITY:** Monitor Angular security advisories

---

## Conclusion

While the current Angular version (17.3.12) has known vulnerabilities, the **actual risk to this application is LOW** because:

1. ✅ No user-generated SVG content
2. ✅ No MathML elements
3. ✅ No protocol-relative URLs
4. ✅ Controlled image upload (can add validation)

**However**, for production deployment, we **strongly recommend**:
1. Implement the immediate mitigations listed above
2. Plan an upgrade to Angular 19.2.18+ within the next sprint
3. Implement Content Security Policy headers
4. Add file type validation for uploads

---

## References

- [Angular Security Guide](https://angular.io/guide/security)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Firebase Security Rules](https://firebase.google.com/docs/storage/security)

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-01  
**Next Review:** Before production deployment
