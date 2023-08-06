import {HTTPStatusCode} from '@shanwker/nx-node-tools';
import {AppError} from '../errors/AppError';
import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2
} from "aws-lambda/trigger/api-gateway-proxy";
import {ServiceBoostrap} from "../types/service/ServiceBoostrap";

export type ApiGatewayHandler = (event: APIGatewayProxyEventV2, context: APIGatewayEventRequestContextV2) => Promise<APIGatewayProxyStructuredResultV2>

export function BaseHandler (servicesBootstrap : Array<ServiceBoostrap>, handler: ApiGatewayHandler): ApiGatewayHandler {
  servicesBootstrap.forEach((serviceBootstrap) => {
    serviceBootstrap.class.init(serviceBootstrap.options);
  });
  return async (event, context) => {
    try {

      await Promise.all(servicesBootstrap.map(async (serviceBootstrap): Promise<void> => {
        if(!serviceBootstrap.class.instance.ready) {
          await serviceBootstrap.class.instance.initializePromise;
        }
      }));


      const result = await handler(event, context);
      result.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Access-Control-Allow-Headers': '*',
        ...result.headers
      }
      return result;
    } catch (error) {
      if (error instanceof AppError) {
        console.error(error);
        return {
          statusCode: error.code,
          body: JSON.stringify({
            message: error.message
          })
        };
      }
      if (error instanceof Error) {
        console.error(error);
        return {
          statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
          body: JSON.stringify({
            message: error.message
          })
        };
      }
      return {
        statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
        body: JSON.stringify({
          message: error
        })
      };
    }
  };
}
