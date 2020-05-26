---
title: "Spring matrix parameter based bypasses"
date: 2020-05-09T15:49:25+09:00
draft: true
---

Spring framework, which is a popular web application framework for Java, supports ["matrix variables"](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-matrix-variables).

With matrix variables, we can set the values of parameters in the path segment.

```
// GET /owners/42;q=11/pets/21;q=22

@GetMapping("/owners/{ownerId}/pets/{petId}")
public void findPet(
        @MatrixVariable(name="q", pathVar="ownerId") int q1,
        @MatrixVariable(name="q", pathVar="petId") int q2) {

    // q1 == 11
    // q2 == 22
}
```

Recently, I and co-workers in the previous company found some library and web servlet couldn't handle the paths which contains matrix variables.
I could exploit those bugs to bypass authentication under some conditions.

I'll introduce the vulnerabilities I reported: CVE-2020-1957 (authentication bypass in Apache Shiro) and CVE-2020-1757 (security bypass in Undertow).

## CVE-2020-1957

### Timeline

- 2020/03/04: The issue was reported to security@shiro.apache.org
- 2020/03/04: Shiro maintainers confirmed and handled the bug
- 2020/03/23: Patched and announcement released

## CVE-2020-1757

### Timeline

- 2019/09/09: The issue was reported to Red Hat Security Team
- 2019/11/28: Team tracked the issue
- 2020/04/??: CVE issued and announced