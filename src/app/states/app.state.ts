import {TaskState} from "./task/task.reducer";
import {GrokAiState} from "./grokai/grokai.reducer";
import {MapState} from "./map/map.reducer";

export interface AppState {
  task: TaskState,
  grokAi: GrokAiState,
  map: MapState,
}
