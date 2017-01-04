import html from 'choo/html';
import areas from '../db/areas';

const area = a => html`
  <li class="item">
    <a class="itemLink" href="/fylke/${a.id}">
      ${a.name}<br>
      <span class="subText">Antall merker: ${a.count}</span>
      <i class="follow">▶</i>
    </a>
  </li>
`;

const browse = () => html`
  <main>
    <h1>Norge</h1>
    <nav>
      <ul class="list">
        ${areas.map(a => area(a))}
      </ul>
    </nav>
  </main>
`;

export default browse;
