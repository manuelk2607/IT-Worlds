import {projectGuides} from './project-guides.ts';
import {text as t,type Bilingual} from './course-types.ts';
export interface ProjectMilestone{id:string;title:Bilingual}
export const projectMilestones:Record<string,ProjectMilestone[]>={
 ...Object.fromEntries(projectGuides.map(project=>[project.id,project.steps.map(step=>({id:step.id,title:step.title}))])),
 auslieferung:[{id:'start',title:t('Eigenen Dienst erfolgreich starten','Start your own service successfully')},{id:'vertrag',title:t('Vier Vertragsprüfungen bestehen','Pass four contract checks')},{id:'fehler',title:t('Fehler nachweisen und wiederherstellen','Demonstrate and recover from faults')},{id:'tests',title:t('Automatisierte Tests ausführen','Run automated tests')},{id:'abnahme',title:t('Abnahme und Grenzen dokumentieren','Document acceptance and limits')}],
 lernbericht:[{id:'modell',title:t('Modell und Constraints begründen','Explain the model and constraints')},{id:'bericht',title:t('Bericht vorhersagen und vergleichen','Predict and compare the report')},{id:'aenderung',title:t('Änderung und Rückkehr prüfen','Check change and recovery')},{id:'test',title:t('Abnahme und Transfer abschließen','Complete acceptance and transfer')}],
 kurskatalog:[{id:'start',title:t('Projekt bauen und starten','Build and start the project')},{id:'daten',title:t('Datenmodell und Filter prüfen','Check the data model and filters')},{id:'bedienung',title:t('Bedienung und Zustände prüfen','Check interactions and states')},{id:'transfer',title:t('Transferaufgabe und Tests abschließen','Complete the transfer task and tests')}],
};
