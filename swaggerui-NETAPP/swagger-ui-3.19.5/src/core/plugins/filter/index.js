import opsFilter from "./opsFilter";
import modelsFilter from "./modelsFilter";
import endpointModelsFilter from "./endpointModelsFilter";

export default function() {
  return {
    fn: {
      opsFilter,
      modelsFilter,
      endpointModelsFilter
    }
  };
}
