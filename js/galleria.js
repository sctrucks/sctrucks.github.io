/* SCTRUCKS — Galleria fotografica
 * Carica le tue foto in img/galleria/ nel repository pubblico.
 * Questa pagina legge automaticamente i file dalla cartella tramite l'API pubblica GitHub.
 * Se l'API non è disponibile, restano visibili le tre foto originali.
 */
(async function(){
 const container=document.getElementById('gallery-grid');
 if(!container)return;
 const owner='sctrucks',repo='sctrucks.github.io',folder='img/galleria';
 try{
  const response=await fetch('https://api.github.com/repos/'+owner+'/'+repo+'/contents/'+folder,{headers:{'Accept':'application/vnd.github+json'}});
  if(!response.ok) return;
  const items=await response.json();
  if(!Array.isArray(items))return;
  const photos=items.filter(f=>f.type==='file' && /\.(jpe?g|png|webp|gif|avif)$/i.test(f.name)).sort((a,b)=>a.name.localeCompare(b.name,'it',{numeric:true}));
  if(!photos.length)return;
  const fragment=document.createDocumentFragment();
  for(const photo of photos){
   const link=document.createElement('a');
   const img=document.createElement('img');
   // URL from GitHub API for files in the explicitly public image folder
   link.href=photo.download_url;
   link.target='_blank';link.rel='noopener noreferrer';
   img.src=photo.download_url;img.alt='SCTRUCKS — '+photo.name.replace(/[_-]/g,' ').replace(/\.[^.]+$/,'');
   img.loading='lazy';
   link.appendChild(img);fragment.appendChild(link);
  }
  container.replaceChildren(fragment);
 }catch(e){/* Preserve fallback photos when offline or rate-limited. */}
})();
