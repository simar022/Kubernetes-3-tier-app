kubectl run load-generator --rm -it --image=busybox:1.28 --restart=Never -- /bin/sh -c "while true; do wget -q -O- http://backend-service:5000/api/stress; done"
