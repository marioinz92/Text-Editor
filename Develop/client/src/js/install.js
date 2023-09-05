const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt
  event.preventDefault();
  
  const deferredPrompt = event;

  butInstall.style.display = 'block';

  // TODO: Implement logic to handle the installation when the button is clicked
  butInstall.addEventListener('click', async () => {
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User declined the PWA installation');
    }

    butInstall.style.display = 'none';
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});

