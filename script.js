/* Edit your sample content here. No dependencies or build tools. */

const projects = {
  cloud: {
    title: 'Cloud launchpad',
    text: 'An illustrative cloud-hosting lab: publish a small static site and trace how a browser reaches it through DNS and HTTPS.',
    learned: 'Practice DNS records, TLS basics, least-privilege access, budget alerts, and teardown documentation. These are learning goals, not completed credentials.',
    next: 'Choose a provider, diagram the request path, deploy a test page, and document setup, expected costs, verification, and cleanup.'
  },
  pipeline: {
    title: 'Commit to cloud',
    text: 'An illustrative CI/CD lab: move from a repository commit to a checked and reviewed deployment.',
    learned: 'Practice GitHub Actions, YAML, check failures, scoped permissions, and a rollback procedure. The pipeline graphic is conceptual, not a live status feed.',
    next: 'Add a syntax check, require it before deployment, and rehearse restoring a previous known-good version in a sandbox.'
  },
  support: {
    title: 'The support playbook',
    text: 'An illustrative client-support runbook for a connection issue, with a focus on accurate diagnosis and useful updates.',
    learned: 'Practice impact assessment, reproducing an issue, DNS and connectivity checks, escalation notes, and plain-language communication.',
    next: 'Write a mock ticket with symptoms, environment, timeline, tests, results, resolution, and an empathetic client update. Keep private customer details out of examples.'
  }
};

const posts = {
  support: {
    title: 'Troubleshooting starts with a better question.',
    date: 'NOV 08, 2026 · SAMPLE ENTRY',
    sections: [
      ['Understand the impact', 'Before suggesting a fix, ask what the person was trying to do, what happened instead, and who else is affected. Confirm when the issue started and whether anything recently changed.'],
      ['Test a hypothesis', 'Separate what you know from what you suspect. For a connection problem, establish whether the issue affects one site, one device, or multiple users. Record the exact error and the result of each check.'],
      ['Keep the person in the loop', 'Explain what you are checking and why in familiar language. If escalation is needed, pass along the impact, timeline, reproduction steps, and results so the client does not have to start over.']
    ]
  },
  pipeline: {
    title: 'My first pipeline: what happens after git push?',
    date: 'OCT 26, 2026 · SAMPLE ENTRY',
    sections: [
      ['A workflow needs a trigger', 'A GitHub Actions workflow can run when a commit is pushed or a pull request is opened. For a small lab, start with one workflow that checks the code and gives a clear result.'],
      ['Checks before deployment', 'A successful syntax check only tells me the code can be parsed. It does not prove the application behaves correctly. I want relevant behavior checks and a review step before changing the live version.'],
      ['Plan the way back', 'Record which commit produced each deployment and keep a known-good version available. A rollback plan is only useful once I have practiced it in a safe environment.']
    ]
  },
  cloud: {
    title: 'DNS, HTTPS, and the journey to a cloud site.',
    date: 'OCT 12, 2026 · SAMPLE ENTRY',
    sections: [
      ['Start with a name', 'DNS helps a browser find the service behind a domain. Depending on the setup, records may point to an IP address or another hostname. Caching means a record change can take time to appear everywhere.'],
      ['Protect the connection', 'HTTPS uses TLS to protect traffic in transit and authenticate the server for the requested hostname. A certificate needs to match that hostname and have a valid trust chain.'],
      ['Hosting is one piece', 'A reachable page is a starting point. My lab checklist also includes access permissions, expected cost, a way to see failures, and cleanup steps for resources I no longer need.']
    ]
  }
};

const dialog = document.querySelector('#detail');
const content = document.querySelector('#detail-content');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectTriggers = document.querySelectorAll('[data-project]');
const postTriggers = document.querySelectorAll('[data-post]');
const resumeButton = document.querySelector('#resume');
const yearNode = document.querySelector('#year');

let opener;

function openDetail(markup) {
  opener = document.activeElement;
  content.innerHTML = markup;
  dialog.showModal();
  dialog.scrollTop = 0;
}

function closeDetail() {
  dialog.close();
}

function renderProjectDetail(projectKey) {
  const item = projects[projectKey];

  return `
    <div class="eyebrow">PROJECT CONCEPT · SAMPLE CONTENT</div>
    <h2>${item.title}</h2>
    <p>${item.text}</p>
    <h3>What I’m learning</h3>
    <p>${item.learned}</p>
    <h3>Next iteration</h3>
    <p>${item.next}</p>
    <p class="sample-note">Replace this concept with your own project story and repository link.</p>
  `;
}

function renderPostDetail(postKey) {
  const post = posts[postKey];
  const sectionsMarkup = post.sections
    .map(([heading, text]) => `<h3>${heading}</h3><p>${text}</p>`)
    .join('');

  return `
    <div class="eyebrow">${post.date}</div>
    <h2>${post.title}</h2>
    ${sectionsMarkup}
  `;
}

function renderResumeDetail() {
  return `
    <div class="eyebrow">SAMPLE RÉSUMÉ · REPLACE WITH YOUR DETAILS</div>
    <h2>Your Name</h2>
    <p>Cloud / DevOps / Client Services · hello@example.com · github.com/your-username</p>
    <h3>Profile</h3>
    <p>An emerging technology professional exploring cloud infrastructure, deployment workflows, and empathetic technical support through hands-on learning.</p>
    <h3>Skills</h3>
    <p>Learning focus: Linux, networking, DNS, Git, CI/CD concepts, troubleshooting, runbooks, and client communication. Replace with skills you can demonstrate.</p>
    <h3>Selected project concepts</h3>
    <p><strong>Cloud launchpad:</strong> Static hosting, DNS, HTTPS, and access controls.<br><strong>Commit to cloud:</strong> CI/CD checks, deployment, and rollback planning.<br><strong>The support playbook:</strong> Structured diagnosis and clear client updates.</p>
    <h3>Experience & education</h3>
    <p>Add your roles, contributions, education, or independent study here. Include dates and specific outcomes that reflect your actual experience.</p>
    <button class="button" id="print-resume">Print / save as PDF ↗</button>
  `;
}

function setupFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { filter } = button.dataset;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      document.querySelectorAll('[data-category]').forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.hidden = !matches;
      });
    });
  });
}

function setupProjectTriggers() {
  projectTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDetail(renderProjectDetail(trigger.dataset.project));
    });
  });
}

function setupPostTriggers() {
  postTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDetail(renderPostDetail(trigger.dataset.post));
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        trigger.click();
      }
    });
  });
}

function setupResumeAction() {
  resumeButton.addEventListener('click', () => {
    openDetail(renderResumeDetail());

    const printButton = document.querySelector('#print-resume');
    if (printButton) {
      printButton.addEventListener('click', () => window.print());
    }
  });
}

function setupDialog() {
  document.querySelector('.close').addEventListener('click', closeDetail);

  dialog.addEventListener('close', () => {
    opener?.focus();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;

    const box = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom;

    if (clickedOutside) {
      closeDetail();
    }
  });
}

function setupYear() {
  yearNode.textContent = new Date().getFullYear();
}

setupDialog();
setupFilters();
setupProjectTriggers();
setupPostTriggers();
setupResumeAction();
setupYear();
