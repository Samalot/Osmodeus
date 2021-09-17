import Schedule from "./Schedule";
import Bot from "../Bot";
import EventType from "../../events/EventType";

class Generic extends Schedule {
  constructor(bot : Bot) {
    super(bot);
  };

  onLoad(): void {
    this.addTask('updateAssetContract', EventType.Core);
    this.addTask('getAssetOrders', EventType.Core);
  };

  setupIntervals() : void {
    this.scheduleTask(5, 'getAssetOrders', EventType.Core);
    this.scheduleTask(15, 'updateAssetContract', EventType.Core);
  };
}

export default Generic;