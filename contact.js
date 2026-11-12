import { contactConfig } from './contact-config.js?v=20261111-ready';

const inquiry = document.getElementById('inquiry-dialog');
const form = document.getElementById('inquiry-form');
const fields = document.getElementById('inquiry-fields');
const sendButton = document.getElementById('inquiry-submit');
const availability = document.getElementById('inquiry-availability');
const errorBox = document.getElementById('inquiry-error');
const success = document.getElementById('inquiry-success');
const heading = document.getElementById('inquiry-title');
const intro = inquiry.querySelector('.inquiry-intro');
let trigger = null;
let sending = false;

// A public submission endpoint is expected; reject arbitrary data destinations.
const endpoint = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(contactConfig.endpoint || '')
  ? contactConfig.endpoint : '';
const configured = Boolean(endpoint && contactConfig.privacyContact?.trim() && contactConfig.retentionPolicy?.trim());
if (contactConfig.privacyContact) document.getElementById('inquiry-privacy-contact').textContent = contactConfig.privacyContact;
if (contactConfig.retentionPolicy) document.getElementById('inquiry-retention').textContent = contactConfig.retentionPolicy;
if (configured) {
  form.action = endpoint;
  sendButton.disabled = false;
  availability.textContent = '작성하신 내용은 비공개로 접수됩니다.';
  availability.classList.add('is-ready');
}

const showError = message => {
  errorBox.textContent = message;
  errorBox.hidden = false;
  if (inquiry.open) {
    errorBox.focus({ preventScroll: true });
    errorBox.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
};
const resetFeedback = () => { errorBox.hidden = true; errorBox.textContent = ''; };
const closeInquiry = () => { if (inquiry.open) inquiry.close(); };

document.querySelectorAll('[data-inquiry-open]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    trigger = button;
    if (!inquiry.open) inquiry.showModal();
    (success.hidden ? heading : document.getElementById('inquiry-success-title')).focus({ preventScroll: true });
  });
});
inquiry.querySelectorAll('[data-inquiry-close]').forEach(button => button.addEventListener('click', closeInquiry));
inquiry.addEventListener('click', event => {
  // Ignore clicks within the panel and clicks finishing a text selection outside it.
  const rect = inquiry.getBoundingClientRect();
  if (event.target === inquiry && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeInquiry();
});
inquiry.addEventListener('close', () => { trigger?.focus({ preventScroll: true }); });
document.getElementById('inquiry-again').addEventListener('click', () => {
  success.hidden = true;
  form.hidden = false;
  intro.hidden = false;
  availability.hidden = false;
  inquiry.setAttribute('aria-labelledby', 'inquiry-title');
  resetFeedback();
  heading.focus({ preventScroll: true });
  inquiry.scrollTop = 0;
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (sending) return;
  resetFeedback();
  if (!configured) {
    showError('온라인 문의 접수를 준비하고 있습니다. 아직 전송되지 않았습니다.');
    return;
  }
  // Reject whitespace-only values without rewriting email addresses or multiline copy.
  for (const id of ['inquiry-name', 'inquiry-email', 'inquiry-message']) {
    const input = document.getElementById(id);
    input.value = input.value.trim();
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('_gotcha')) { showError('요청을 처리하지 못했습니다. 페이지를 다시 열어 주세요.'); return; }
  data.set('subject', '[93seconds] 프로젝트 문의');
  data.set('privacy_notice', `수집: 이름·이메일·전화번호(선택)·제작 유형·문의 내용 / 목적: 프로젝트 상담 및 답변 / 보관: ${contactConfig.retentionPolicy} / 문의: ${contactConfig.privacyContact} / 처리: Formspree 저장 및 이메일 알림`);
  sending = true;
  fields.disabled = true;
  sendButton.disabled = true;
  sendButton.textContent = '문의 내용을 보내고 있습니다…';
  form.setAttribute('aria-busy', 'true');
  availability.textContent = '접수 결과를 확인하고 있습니다. 잠시만 기다려 주세요.';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  let accepted = false;
  try {
    const response = await fetch(endpoint, {
      method: 'POST', body: data, headers: { Accept: 'application/json' },
      signal: controller.signal, credentials: 'omit', redirect: 'error',
    });
    if (!response.ok) {
      if (response.status === 429) showError('현재 문의 요청이 많습니다. 잠시 후 다시 시도해 주세요. 작성 내용은 유지됩니다.');
      else if (response.status >= 500) showError('접수 결과를 확인하지 못했습니다. 작성 내용은 유지됩니다. 재전송하면 중복 접수될 수 있습니다.');
      else showError('문의를 접수하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해 주세요. 작성 내용은 유지됩니다.');
      return;
    }
    // Only clear the draft after the service confirms acceptance.
    accepted = true;
    form.reset();
    form.hidden = true;
    intro.hidden = true;
    availability.hidden = true;
    success.hidden = false;
    inquiry.setAttribute('aria-labelledby', 'inquiry-success-title');
    inquiry.scrollTop = 0;
    if (inquiry.open) document.getElementById('inquiry-success-title').focus({ preventScroll: true });
  } catch {
    showError('전송 결과를 확인하지 못했습니다. 인터넷 연결을 확인해 주세요. 작성 내용은 유지되며, 재전송하면 중복 접수될 수 있습니다.');
  } finally {
    clearTimeout(timeout);
    sending = false;
    fields.disabled = false;
    sendButton.disabled = false;
    sendButton.innerHTML = '프로젝트 문의 보내기 <img class="inquiry-icon" src="assets/icons/project-inquiry.svg" alt="" width="24" height="24">';
    form.removeAttribute('aria-busy');
    availability.textContent = accepted ? '문의가 접수되었습니다.' : '작성하신 내용은 비공개로 접수됩니다.';
  }
});
