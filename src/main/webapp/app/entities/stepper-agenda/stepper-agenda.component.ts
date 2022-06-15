import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { PagingView } from '../../utils/pagination/PagingView';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'jhi-stepper-agenda',
  templateUrl: './stepper-agenda.component.html',
  styleUrls: ['./stepper-agenda.styles.scss'],
})
export class StepperAgendaComponent extends PagingView implements OnInit {
  formStepsNum = 0;

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute, public eventManager: JhiEventManager) {
    super(router, activatedRoute, eventManager, 'especialidad');
    this.eventManager.subscribe('medic-directory-reload', () => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    const prevBtns = document.querySelectorAll('.btn-prev');
    const nextBtns = document.querySelectorAll('.btn-next');

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.formStepsNum++;
        this.updateFormSteps();
        this.updateProgressbar();
      });
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.formStepsNum--;
        this.updateFormSteps();
        this.updateProgressbar();
      });
    });
  }

  updateFormSteps(): void {
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach(formStep => {
      formStep.classList.contains('form-step-active') && formStep.classList.remove('form-step-active');
    });
    formSteps[this.formStepsNum].classList.add('form-step-active');
  }

  updateProgressbar(): void {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progress = document.getElementById('progress');

    progressSteps.forEach((progressStep, idx) => {
      if (idx < this.formStepsNum + 1) {
        progressStep.classList.add('progress-step-active');
      } else {
        progressStep.classList.remove('progress-step-active');
      }
    });
    const progressActive = document.querySelectorAll('.progress-step-active');
    if (progress !== null) {
      progress.style.width = (((progressActive.length - 1) / (progressSteps.length - 1)) * 100).toString() + '%';
    }
  }
}
