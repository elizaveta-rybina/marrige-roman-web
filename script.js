document.addEventListener('mousemove', (event) => {
    const blobs = document.querySelectorAll('.blob');
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const moveX = (x * speed) - (speed / 2);
        const moveY = (y * speed) - (speed / 2);

        blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvpForm');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !submitBtn || !window.Appwrite) {
        return;
    }

    const client = new Appwrite.Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('YOUR_PROJECT_ID');

    const databases = new Appwrite.Databases(client);
    const DATABASE_ID = 'YOUR_DATABASE_ID';
    const COLLECTION_ID = 'YOUR_COLLECTION_ID';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'ОТПРАВКА...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const name = formData.get('name');
        const attendance = formData.get('attendance');
        const alcoholPreferences = formData.getAll('alcohol');

        const documentData = {
            name,
            is_attending: attendance === 'yes',
            alcohol: alcoholPreferences.join(', '),
        };

        try {
            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                Appwrite.ID.unique(),
                documentData
            );

            alert('Спасибо! Твоя анкета успешно отправлена ❤️');
            form.reset();
        } catch (error) {
            console.error('Ошибка Appwrite:', error);
            alert('Произошла ошибка при отправке: ' + error.message);
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});