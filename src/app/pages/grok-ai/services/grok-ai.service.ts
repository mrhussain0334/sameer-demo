import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GrokAiService {

  private apiKey: string = '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';

  constructor() {}

  async analyzeCode(code: string): Promise<string> {
    try {
      return axios.post('https://api.grok.ai/prompt', {
        prompt: code
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
    } catch (error) {
      console.error('Error analyzing code:', error);
      return 'Error analyzing code.';
    }
  }
}
