import opsFilter from "./opsFilter"
import modelsFilter from "./modelsFilter"
import tagsFilter from "./tagsFilter"

export default function() {
  return {
    fn: {
      opsFilter,
      modelsFilter,
      tagsFilter
    }
  }
}
