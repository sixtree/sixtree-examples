import org.mule.api.MuleEventContext;
import org.mule.api.lifecycle.Callable;
import org.mule.api.transport.PropertyScope;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;

public class UserACLExtractor implements Callable {

  private static final Logger log = LoggerFactory.getLogger(UserACLExtractor.class);

  @Override
  public Object onCall(MuleEventContext eventContext) throws Exception {
    String username = null;
    String userACL = null;

    // Get access to the userPrincipal
    Object userPrincipal = eventContext.getSession().getSecurityContext().getAuthentication().getPrincipal();
		
    if (userPrincipal instanceof LdapUserDetailsImpl) {
      // Get the username
      username = ((LdapUserDetailsImpl) userPrincipal).getUsername();

      // Risky business to fetch the password
      String password = ((LdapUserDetailsImpl) userPrincipal).getPassword();

      // Get the ACL or list of groups the User belongs to. This is a comma separated list of .
      userACL = ((LdapUserDetailsImpl) userPrincipal).getAuthorities().toString();
    }

    log.debug("USER - " + username);
    log.debug("GRANTED AUTHORITIES - " + userACL);
    eventContext.getMessage().setProperty("http.request.inbound.user.name", username, PropertyScope.SESSION);
    eventContext.getMessage().setProperty("http.request.inbound.user.acl", userACL.split(','), PropertyScope.SESSION);

    return eventContext.getMessage();
  }
}
