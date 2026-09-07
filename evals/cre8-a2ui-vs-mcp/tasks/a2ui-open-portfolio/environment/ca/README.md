Trust material for a TLS-terminating egress proxy.

This directory is empty of certificates in the repository and stays that way on
an ordinary network. Behind a proxy that re-terminates TLS, `prepare.sh` drops
the proxy's CA in here (as `proxy-ca.crt`, gitignored) so that curl, npm and the
agent inside the container can verify the connections they make. Without it the
agent install fails with "self-signed certificate in certificate chain".
