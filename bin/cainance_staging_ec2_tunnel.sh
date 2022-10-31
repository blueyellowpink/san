# tunnel Postgresql
COUNT=$(netstat -anp tcp | grep 127.0.0.1.5432 | wc -l)
if [ $COUNT = 0 ]
then
    echo "Start Postgresql tunneling"
	ssh -f cainance-staging -L 5432:127.0.0.1:5432 -N
else
    echo "Postgresql is tunneling"
fi

# tunnel Mongodb
COUNT=$(netstat -anp tcp | grep 127.0.0.1.27017 | wc -l)
if [ $COUNT = 0 ]
then
    echo "Start Mongodb tunneling"
	ssh -f cainance-staging -L 27017:127.0.0.1:27017 -N
else
    echo "Mongodb is tunneling"
fi

# tunnel Redis
COUNT=$(netstat -anp tcp | grep 127.0.0.1.6379 | wc -l)
if [ $COUNT = 0 ]
then
    echo "Start Redis tunneling"
    ssh -f cainance-staging -L 6379:127.0.0.1:6379 -N
else
    echo "Redis is tunneling"
fi

# tunnel Kafka
COUNT=$(netstat -anp tcp | grep 127.0.0.1.9092 | wc -l)
if [ $COUNT = 0 ]
then
    echo "Start Kafka tunneling"
    ssh -f cainance-staging -L 9092:127.0.0.1:9092 -N
else
    echo "Kafka is tunneling"
fi
