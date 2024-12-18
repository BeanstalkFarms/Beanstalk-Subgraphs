# Beanstalk Subgraphs

[![Discord][discord-badge]][discord-url]

[discord-badge]: https://img.shields.io/discord/880413392916054098?label=Beanstalk
[discord-url]: https://discord.gg/beanstalk

**Indexes events emitted by [Beanstalk](https://github.com/BeanstalkFarms/Beanstalk).**

## Subgraphs

Endpoint: POST [https://graph.bean.money/{name}](https://graph.bean.money/)
Explorers:

- [Beanstalk](https://graph.bean.money/beanstalk)
- [Bean](https://graph.bean.money/bean)
- [Basin](https://graph.bean.money/basin)

Subgraph names are according to the projects in the `src/subgraphs` folder. Dev subgraphs are appended with `-dev` and testing subgraphs with `-testing`.

To retrieve data from when Beanstalk was on Ethereum, append `_eth` to the name.

All subgraphs are hosted on a mix of Alchemy and Graph Network, with responses served from a proxy api managed by Beanstalk Farms. Read more about the advantages of the proxy here: https://github.com/BeanstalkFarms/Subgraph-Proxy.

## Testing

To test with Docker, the first time you will need to run `yarn run graph test -d`. This will build the `matchstick` Docker image. Then, you can use the `yarn testd` script to run all tests. Alternatively, use `yarn testd-named <TestName1> ...` to run specific tests. I have found running in Docker to be preferred since otherwise there can be issues with console output and some test cases fail silently.

## Deploying

When using graph cli commands, you will often need to specify which manifest file should be used. This is necessary to support multiple chains in the same codebase. The commands which need it will be evident - as they will fail when unable to find a `subgraph.yaml` file. In those commands, include `./manifest/${chain}.yaml` as the final argument to the command. See scripts inside `package.json` for examples.

It may be necessary to run `yarn build-cache` prior to a new deployment build. This updates historical cached values, particularly as it pertains to the L1 -> L2 migration. It will be necessary to re-run these scripts if updates to the L1 subgraph are made that need to have some values carried to the L2 subgraph. Note that it may not always be appropriate to run every script in the corresponding `cache-builder` directory, use with caution.

## Development

### Handler organization strategy

Any events that are currently relevant to Beanstalk should reference the codegen for whichever is the latest protocol ABI, and not include v1/v2 etc in the name. Legacy events (that are no longer present on-chain) should reference the codegen for the upgrade in which they were initially deployed, and use the appropriate version number in the method names. Legacy handlers should also be placed in the `legacy` folder.

Underlying logic should be included in a separate file provided in the `utils` folder. The advantage of this is in accommodating a scenario where an event signature gets updated. The replacement event handler can call into the shared util along with the legacy handler.

## License

[MIT](https://github.com/BeanstalkFarms/Beanstalk/blob/master/LICENSE.txt)
