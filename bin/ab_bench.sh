ab -n 20 -c 5 -l -k \
	-T application/json \
	-p post.json \
	-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVjZDFkMDRkMmVmNjhjNGY3MGU4N2QiLCJlbWFpbCI6IjEyM3F3ZUBnbWFpbC5jb20iLCJpYXQiOjE2NjcwMjc0MTZ9.OFFOx8sx8UsKFN9Ik0ncU4Qq5FofD3ZHH_wErSaE9NQ' \
	http://localhost:3000/api/user/buy
