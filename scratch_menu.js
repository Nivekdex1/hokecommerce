const fs = require('fs');
const html = fs.readFileSync('live_site.html', 'utf8');

const { JSDOM } = require('jsdom');
const dom = new JSDOM(html);
const document = dom.window.document;

const nav = document.querySelector('nav');
if (!nav) {
  console.log('No nav found');
  process.exit();
}

const items = nav.querySelectorAll('li');
items.forEach(item => {
  console.log('----------------');
  const mainLink = item.querySelector('button') || item.querySelector('a');
  console.log('Main:', mainLink ? mainLink.textContent : 'none');
  
  // since it's Next.js and Headless UI, the popover panel might not be rendered inside the `li` if it's teleported or hidden, but wait!
  // It might be in a next script tag if it's hydration data, or it might just be hidden.
  // let's just log all links inside this li.
  const links = item.querySelectorAll('a');
  links.forEach(l => {
     console.log('  ->', l.textContent, l.href);
  });
});
