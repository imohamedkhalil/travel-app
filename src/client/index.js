import {app} from './js/app';
import './styles/style.scss';


const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', app());

export {app}
