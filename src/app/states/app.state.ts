import {TaskState} from "./task/task.reducer";
import {GrokAiState} from "./grokai/grokai.reducer";

export interface AppState {
  task: TaskState,
  grokAi: GrokAiState
}
