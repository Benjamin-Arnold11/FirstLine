// Sidebar collapse toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const buttons = document.querySelectorAll('.nav-btn');
  const sectionTitle = document.getElementById('section-title');
  const sectionText = document.getElementById('section-text');

  const sections = {
    intro: `Just like Python uses <b>print()</b>, HTML uses <b>tags</b> to display text.<br><br>
            Example:<br><code>&lt;h1&gt;Hello World&lt;/h1&gt;</code><br><br>
            CSS styles HTML by selecting elements and changing their appearance:<br>
            <code>h1 { color: purple; text-align: center; }</code>`,

    display: `To display text in HTML, we use heading and paragraph tags.<br><br>
              <code>&lt;h1&gt;Title&lt;/h1&gt;<br>&lt;p&gt;This is a paragraph.&lt;/p&gt;</code><br><br>
              CSS can style these:<br>
              <code>p { color: skyblue; }</code>`,

    essentials: `Some essential tags in HTML include:<br><br>
                <ul>
                  <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> — Headings</li>
                  <li><code>&lt;p&gt;</code> — Paragraphs</li>
                  <li><code>&lt;a&gt;</code> — Links</li>
                  <li><code>&lt;img&gt;</code> — Images</li>
                  <li><code>&lt;div&gt;</code> — Containers</li>
                </ul><br>
                CSS uses <code>{ }</code> brackets and selectors to change how elements look.`
  };

  // Collapsible sidebar
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Sidebar navigation
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const section = btn.dataset.section;
      sectionTitle.textContent = btn.textContent;
      sectionText.innerHTML = sections[section];
    });
  });

  // CodeMirror setup
  const editor = CodeMirror.fromTextArea(document.getElementById('code-input'), {
    mode: 'htmlmixed',
    theme: 'default',
    lineNumbers: true,
    tabSize: 2
  });

  // Auto-update preview
  const previewFrame = document.getElementById('preview');
  const updatePreview = () => {
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(editor.getValue());
    doc.close();
  };

  editor.on('change', updatePreview);
  updatePreview();
});
