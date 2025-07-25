import { McpUnity } from '../unity/mcpUnity.js';
import { Logger } from '../utils/logger.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { McpUnityError, ErrorType } from '../utils/errors.js';
import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';

// Constants for the resource
export const resourceName = 'get_scenes_hierarchy_simple';
export const resourceUri = 'unity://scenes_hierarchy_simple';
export const resourceMimeType = 'application/json';

/**
 * Creates and registers the Simple Scenes Hierarchy resource with the MCP server
 * This resource provides a lightweight view of the Unity scene hierarchy
 * 
 * @param server The MCP server instance to register with
 * @param mcpUnity The McpUnity instance to communicate with Unity
 * @param logger The logger instance for diagnostic information
 */
export function registerGetHierarchySimpleResource(server: McpServer, mcpUnity: McpUnity, logger: Logger) {
  logger.info(`Registering resource: ${resourceName}`);
      
  // Register this resource with the MCP server
  server.resource(
    resourceName,
    resourceUri,
    {
      description: 'Retrieve a simplified hierarchy of all GameObjects in the Unity loaded scenes (lightweight version with only name, instanceId, and children)',
      mimeType: resourceMimeType
    },
    async () => {
      try {
        return await resourceHandler(mcpUnity);
      } catch (error) {
        logger.error(`Error handling resource ${resourceName}: ${error}`);
        throw error;
      }
    }
  );
}

/**
 * Handles requests for simplified hierarchy information from Unity
 * 
 * @param mcpUnity The McpUnity instance to communicate with Unity
 * @returns A promise that resolves to the simplified hierarchy data
 * @throws McpUnityError if the request to Unity fails
 */
async function resourceHandler(mcpUnity: McpUnity): Promise<ReadResourceResult> {
  const response = await mcpUnity.sendRequest({
    method: resourceName,
    params: {}
  });
  
  if (!response.success) {
    throw new McpUnityError(
      ErrorType.RESOURCE_FETCH,
      response.message || 'Failed to fetch simplified hierarchy from Unity'
    );
  }
  
  return {
    contents: [{ 
      uri: resourceUri,
      mimeType: resourceMimeType,
      text: JSON.stringify(response.hierarchy, null, 2)
    }]
  };
}