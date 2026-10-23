var e=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]);async function t(){let e=`/nayi-lehar`.replace(/\/$/,``);return(await fetch(`${e}/search-index.json`)).json()}function n(t,n=!1){return t.map(t=>`
    <li class="r">
      <img src="${t.thumb}" alt="" width="160" height="100" loading="lazy" decoding="async" />
      <div>
        <span class="chip">${e(t.category)}</span>
        <h2><a href="${t.href}">${e(t.title)}</a></h2>
        <p class="clamp-2">${e(t.excerpt)}</p>
        <p class="meta"><span>By <strong>${e(t.author)}</strong></span><span>· ${e(t.date)}</span></p>
        ${n?`<button type="button" class="btn btn-ghost rm" data-bookmark="${t.slug}" aria-pressed="true"><span class="bm-label">सेव किया</span> — हटाएं</button>`:``}
      </div>
    </li>`).join(``)}export{n,t};