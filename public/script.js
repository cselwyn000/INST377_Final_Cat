fetch('/api/cats').then(r => r.json()).then(cats => {
  document.getElementById('cats').innerHTML = cats.map(c =>
    `<div><img src="${c.image_url}"><br><button onclick="vote(${c.id})">Vote</button></div>`
  ).join('');
});

function vote(id) {
  fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  }).then(() => alert('Thanks!'));
}