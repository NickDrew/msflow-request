# msflow-request
Request wrapper to simplify calling Microsft Flow [Logic Apps](https://docs.microsoft.com/en-us/azure/logic-apps/logic-apps-http-endpoint) HTTP requests triggers from node

```js
const msFlowRequest = require('msflow-request')

const requestOptions = {
        triggerURL: "<url copied from flow>",
        triggerType: "<get|post|put|patch|delete>",
        data: "<optional JSON data for post/put/patch operations>",
        proxy: "<optional proxy address>",
        timeout: "<optional timeout in MS>" }

const flowTrigger = new MSFlowRequest.FlowTrigger(requestOptions)

try{
    const flowResponse = await flowTrigger.trigger();
}
catch(flowError)
{
    console.log(flowError)
}
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).


Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install ms-flow
```

## Features

  * Simple to use
  * Easy access to data returned from Microsoft Flow HTTP Request triggers
  * Easy access to the errors returned from Microsoft Flow HTTP request triggers
  * Easy access to data returned from Microsoft Flow HTTP Response steps
  * Simple configuration of proxy and timout values

## Request options
  * triggerURL (mandatory): The URL provided by [Microsoft Flow](https://flow.microsoft.com) when a flow with a HTTP Request trigger is saved
  * triggerType (mandatory): The type of operation the HTTP Request trigger has been setup to accept (get|post|put|patch|delete)
  * data (optional): JSON data to be used for post/put/patch operations
  * proxy (optional): The proxy service your node application will need to call to access the HTTP Request trigger
  * timeout (optional): The maximum time in ms the request will wait for a response before timing out

## Response fields
   * requestID: Unique ID for the request
   * requestDateTime: Datetime the request was recieved by Flow
   * statusCode: Status code returned by flow (normally 200 or 202)
   * workflowRunID: Unique ID for this run of the flow
   * correlationID: Unique ID for the request
   * clientTrackingID: Unique ID for this run of the flow
   * triggerHistoryName: Unique ID for this run of the flow
   * executionLocation: Datacenter location called by this request
   * workflowID: Unique ID of the flow
   * workflowVersion: Encoded Flow version
   * workflowName: Encoded Flow name
   * workflowSystemID: Unique path to the flow
   * trackingID: Unique ID for the request
   * remainingWorkflowWrites: Remaining burst writes (only returned when writing data)
   * remainingWorkflowReads: Remaining burst reads (only returned when reading data)
   * remainingWorkflowDLSize: Remaining burst download capacity (only returned when downloading)
   * remainingWorkflowULSize: Remaining burst upload capacity (only returned when uploading)
   * remainingAPIRequests: Remaining burst api requests
   * data: JSON data returned by Flow response step (if one exists for the called flow)
   * rawHead: Raw header information returned from flow

## Error fields
   * requestID: Unique ID for the request, if the request made it to the Flow
   * requestDateTime: Datetime the request was recieved by flow, if the request made it to the Flow
   * statusCode: Either a network error, or a status code returned by flow
   * error: Error type
   * message: Additional error message information

## People

The author and maintainer of msflow-request is  [Nick Drew](https://github.com/NickDrew)