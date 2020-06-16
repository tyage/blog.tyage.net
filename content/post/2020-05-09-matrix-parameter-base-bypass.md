---
title: "Security filter bypass using Spring's \"matrix variables\""
date: 2020-05-09T15:49:25+09:00
---

Spring framework, which is a popular web application framework for Java, supports ["matrix variables"](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-matrix-variables).

With matrix variables, we can set the values of parameters in the path segment.

```java
// GET /owners/42;q=11/pets/21;q=22

@GetMapping("/owners/{ownerId}/pets/{petId}")
public void findPet(
        @MatrixVariable(name="q", pathVar="ownerId") int q1,
        @MatrixVariable(name="q", pathVar="petId") int q2) {

    // q1 == 11
    // q2 == 22
}
```
*[source](https://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#mvc-ann-matrix-variables)*

When I worked in my previous company, I and co-workers found some library and web servlet couldn't handle the paths which contains matrix variables correctly.
I could exploit those bugs to bypass authentication under some conditions.

I'll introduce the vulnerabilities I reported: CVE-2020-1957 (authentication bypass in Apache Shiro) and CVE-2020-1757 (security bypass in Undertow).

## CVE-2020-1957

CVE-2020-1957 is the bug found in Apache Shiro.
Apache Shiro is a security framework provides authentications, authorization and so on.

With Shiro, we can easily implement the authentication filter so that we can restrict the access to some endpoints from normal users.

Here is the sample application: <https://github.com/apache/shiro/tree/master/samples/spring-hibernate> .
In this app, [applicationContext.xml](https://github.com/apache/shiro/blob/2e297858be85ffe95b9d2066dd6287643b32b492/samples/spring-hibernate/src/main/webapp/WEB-INF/applicationContext.xml) defines that only authenticated users can access the URL like `/s/**`. So, users can't access `http://localhost:9080/s/home` without login.
```xml
    <bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
        ...
        <property name="filterChainDefinitions">
            <value>
                /s/signup = anon
                /s/manageUsers = perms[user:manage]
                /s/** = authc
            </value>
        </property>
    </bean>
```
*[source](https://github.com/apache/shiro/blob/2e297858be85ffe95b9d2066dd6287643b32b492/samples/spring-hibernate/src/main/webapp/WEB-INF/applicationContext.xml#L123)*

When I looked into the Shiro, I found the following method which removes the characters appears after `;`.

```java
    private static String decodeAndCleanUriString(HttpServletRequest request, String uri) {
        uri = decodeRequestString(request, uri);
        int semicolonIndex = uri.indexOf(';');
        return (semicolonIndex != -1 ? uri.substring(0, semicolonIndex) : uri);
    }
```
*[source](https://github.com/apache/shiro/blob/fa1686d0a9fc5914e8dfc6eb92d82c6e4f12be41/web/src/main/java/org/apache/shiro/web/util/WebUtils.java#L234)*

And the URI string which contains `../` is normalized **after** it is cleaned. I'd also note that `HttpServletRequest.getRequestURI()` returns the requested URI as it is.
```java
    public static String getRequestUri(HttpServletRequest request) {
        String uri = (String) request.getAttribute(INCLUDE_REQUEST_URI_ATTRIBUTE);
        if (uri == null) {
            uri = request.getRequestURI();
        }
        return normalize(decodeAndCleanUriString(request, uri));
    }
```
*[source](https://github.com/apache/shiro/blob/fa1686d0a9fc5914e8dfc6eb92d82c6e4f12be41/web/src/main/java/org/apache/shiro/web/util/WebUtils.java#L141)*

So, if the request URI is `http://localhost:8090/FOO/../BAR`, Shiro thinks it should be `http://localhost:8090/BAR`. But if the URI is `http://localhost:8090/FOO;/../BAR`, Shiro thinks it is `http://localhost:8090/FOO` and applies the filter for `/FOO`.

I could bypass the authentication filter in the sample application with this command: `curl 'http://localhost:9080/unauthorized;/../s/home' --path-as-is`. It shows the home page without login because Shiro does not restrict the access to `/unauthorized` but Spring returns the result of `/s/home`!

To make it more clear, following table shows how Shiro and Spring Framework treat this request URI.

||URI|
| ------------- | ------------- |
|Original request|`http://localhost:8090/unauthorized;/../s/home`|
|Shiro|`http://localhost:8090/unauthorized`|
|Spring|`http://localhost:8090/s/home`|

### Timeline

- 2020/03/04: The issue was reported to security@shiro.apache.org
- 2020/03/04: Shiro maintainers confirmed and handled the bug
- 2020/03/23: Patched and announcement released

## CVE-2020-1757

TBD

### Timeline

- 2019/09/09: The issue was reported to Red Hat Security Team
- 2019/11/28: Team tracked the issue
- 2020/04/??: CVE issued and announced

## To prevent this kind of attack

Actually, [Spring Security](https://spring.io/projects/spring-security) has a firewall that blocks the request contains `../` or `;`.
So, it should be fine if your application installs Spring Security.