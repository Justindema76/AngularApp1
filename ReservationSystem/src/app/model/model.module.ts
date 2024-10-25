import { NgModule } from "@angular/core";
import { LocationRepository } from "./location.repository"; // Import the new LocationRepository
import { StaticDataSource } from "./static.datasource"; // Data source that provides locations

@NgModule({
  providers: [LocationRepository, StaticDataSource] // Provide LocationRepository and StaticDataSource
})
export class ModelModule { }
