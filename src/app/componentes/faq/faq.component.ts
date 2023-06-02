import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent {

  faqData = [
    {
      question: 'Pregunta 1',
      answer: 'Respuesta 1'
    },
    {
      question: 'Pregunta 2',
      answer: 'Respuesta 2'
    },
    {
      question: 'Pregunta 3',
      answer: 'Respuesta 3'
    },
    {
      question: 'Pregunta 4',
      answer: 'Respuesta 4'
    },
    {
      question: 'Pregunta 5',
      answer: 'Respuesta 5'
    },
    // Add more questions and answers as needed
  ];

  // Keep track of the currently selected question
  selectedQuestionIndex: number | null = null;

  // Function to toggle the display of the answer for a question
  toggleAnswer(index: number) {
    if (this.selectedQuestionIndex === index) {
      // Close the answer if the same question is clicked again
      this.selectedQuestionIndex = null;
    } else {
      this.selectedQuestionIndex = index;
    }
  }

}
