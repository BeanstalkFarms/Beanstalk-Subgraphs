import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { Sow, PlotTransfer, Harvest, TemperatureChange } from "../../generated/Beanstalk-ABIs/SeedGauge";
import { mockBeanstalkEvent } from "../../../../core/tests/event-mocking/Util";

export function createWeatherChangeEvent(season: BigInt, caseID: BigInt, change: i32): void {}

// BIP45 renamed
export function createTemperatureChangeEvent(season: BigInt, caseId: BigInt, absChange: i32): TemperatureChange {
  let event = changetype<TemperatureChange>(mockBeanstalkEvent());
  event.parameters = new Array();

  let param1 = new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season));
  let param2 = new ethereum.EventParam("caseId", ethereum.Value.fromUnsignedBigInt(caseId));
  let param3 = new ethereum.EventParam("absChange", ethereum.Value.fromI32(absChange));

  event.parameters.push(param1);
  event.parameters.push(param2);
  event.parameters.push(param3);

  return event as TemperatureChange;
}

export function createSowEvent(account: string, index: BigInt, beans: BigInt, pods: BigInt): Sow {
  let event = changetype<Sow>(mockBeanstalkEvent());
  event.parameters = new Array();

  let param1 = new ethereum.EventParam("account", ethereum.Value.fromAddress(Address.fromString(account)));
  let param2 = new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index));
  let param3 = new ethereum.EventParam("beans", ethereum.Value.fromUnsignedBigInt(beans));
  let param4 = new ethereum.EventParam("pods", ethereum.Value.fromUnsignedBigInt(pods));

  event.parameters.push(param1);
  event.parameters.push(param2);
  event.parameters.push(param3);
  event.parameters.push(param4);

  return event as Sow;
}
export function createHarvestEvent(account: string, plots: BigInt[], beans: BigInt): Harvest {
  let event = changetype<Harvest>(mockBeanstalkEvent());
  event.parameters = new Array();

  let plotsArray: ethereum.Value[] = [];
  for (let i = 0; i < plots.length; ++i) {
    plotsArray.push(ethereum.Value.fromUnsignedBigInt(plots[i]));
  }

  let param1 = new ethereum.EventParam("account", ethereum.Value.fromAddress(Address.fromString(account)));
  let param2 = new ethereum.EventParam("plots", ethereum.Value.fromArray(plotsArray));
  let param3 = new ethereum.EventParam("beans", ethereum.Value.fromUnsignedBigInt(beans));

  event.parameters.push(param1);
  event.parameters.push(param2);
  event.parameters.push(param3);

  return event as Harvest;
}

export function createPlotTransferEvent(from: string, to: string, id: BigInt, pods: BigInt): PlotTransfer {
  let event = changetype<PlotTransfer>(mockBeanstalkEvent());
  event.parameters = new Array();

  let param1 = new ethereum.EventParam("from", ethereum.Value.fromAddress(Address.fromString(from)));
  let param2 = new ethereum.EventParam("to", ethereum.Value.fromAddress(Address.fromString(to)));
  let param3 = new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id));
  let param4 = new ethereum.EventParam("pods", ethereum.Value.fromUnsignedBigInt(pods));

  event.parameters.push(param1);
  event.parameters.push(param2);
  event.parameters.push(param3);
  event.parameters.push(param4);

  return event as PlotTransfer;
}
export function createSupplyIncreaseEvent(
  season: BigInt,
  price: BigInt,
  newHarvestable: BigInt,
  newSilo: BigInt,
  issuedSoil: i32
): void {}
export function createSupplyDecreaseEvent(season: BigInt, price: BigInt, issuedSoil: i32): void {}
export function createSupplyNeutralEvent(season: BigInt, issuedSoil: i32): void {}
export function createFundFundraiserEvent(id: BigInt, fundraiser: string, token: string, amount: BigInt): void {}
