import opsFilter from "./opsFilter"
import modelsFilter from "./modelsFilter"

export default function() {
  return {
    fn: {
      opsFilter,
      modelsFilter
    }
  }
}
