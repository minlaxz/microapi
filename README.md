### A Small `API` hosted on `Deta.sh` Using `Express` and `Node.js`

- Express routes
- Express middleware
- Express error handling
- Express request logging
- Express request parsing
- Express response formatting
- Express response caching
- Express response compression

**Serverless** API on [`Deta.sh`](https://deta.sh) platform and is available [here](https://microapi.octocat.tk)

**Load balancer** with **`Kubernetes`** is available [here](http://laxzs260b3-produ5cdc2-dyrro270e3-1274939711.us-east-1.elb.amazonaws.com/)

Example: Fetch last commit of this repository on branch `main`:

http://laxzs260b3-produ5cdc2-dyrro270e3-1274939711.us-east-1.elb.amazonaws.com/api/v1/github/lastcommit?repo=microapi
