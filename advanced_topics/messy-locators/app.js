const searchInput = document.querySelector('.legacy_toolbar__inp');
const dataRows = () =>
  Array.from(document.querySelectorAll('.legacy_tbl__r[role="row"]'));

function rowText(row) {
  return row.textContent ?? '';
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  dataRows().forEach((row) => {
    const matches = query === '' || rowText(row).toLowerCase().includes(query);
    row.hidden = !matches;
  });
}

searchInput.addEventListener('input', applySearch);

document.querySelectorAll('.legacy_tbl__r[role="row"]').forEach((row) => {
  const assignButton = row.querySelector('.legacy_btn__asg');
  const deleteButton = row.querySelector('.legacy_btn__del');
  const statusSpan = row.querySelector('.legacy_tbl__st');

  assignButton?.addEventListener('click', (event) => {
    event.preventDefault();
    if (statusSpan) {
      statusSpan.textContent = 'Assigned';
    }
  });

  deleteButton?.addEventListener('click', () => {
    row.remove();
  });
});
