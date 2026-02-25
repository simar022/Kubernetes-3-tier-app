DB_POD=$(kubectl get pod -l tier=db-layer -o jsonpath='{.items[0].metadata.name}')
kubectl cp init.sql $DB_POD:/tmp/init.sql
kubectl exec -it $DB_POD -- psql -U postgres -d postgres -f /tmp/init.sql
