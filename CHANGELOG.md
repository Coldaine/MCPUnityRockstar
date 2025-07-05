# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3] - 2025-07-04

### Added
- New `unity://scenes_hierarchy_simple` resource that provides a lightweight view of the scene hierarchy
- `GetScenesHierarchySimpleResource.cs` - Unity C# resource implementation
- `getScenesHierarchySimpleResource.ts` - Node.js MCP server handler
- Enhanced performance for AI agents that only need basic scene structure information

### Changed
- Updated MCP server to register the new simplified hierarchy resource
- Enhanced resource documentation with lightweight alternative option

### Benefits
- **Performance**: Faster response times for AI agents needing only basic scene info
- **Efficiency**: Reduced data transfer compared to full hierarchy resource
- **Compatibility**: Fully backward compatible, original hierarchy resource still available

### Usage
The new resource can be accessed via `unity://scenes_hierarchy_simple` and returns:
- Scene name
- GameObject name and instance ID
- Hierarchical children structure
- No additional properties (transforms, components, active state, etc.)

This is ideal for AI agents that need to understand scene structure without the overhead of complete GameObject information.

---

*Note: This is an enhanced version built on the original MCP Unity package by CoderGamester*
*Original Repository: https://github.com/CoderGamester/mcp-unity*