document.addEventListener("DOMContentLoaded", function() {
    var loadedCount = 0;
    var allResourcesBeingLoaded = [];
    Blazor.start({ // start manually with loadBootResource
        loadBootResource: function (type, filename, defaultUri, integrity) {
            console.log(`Loading: '${type}', '${filename}', '${defaultUri}'`);

            if (type == "dotnetjs")
                return defaultUri;

            var fetchResources = fetch(defaultUri,
                {
                    cache: 'no-cache',
                    integrity: integrity,
                    headers: { 'MyCustomHeader': 'My custom value' }
                });


            allResourcesBeingLoaded.push(fetchResources);
            fetchResources.then((r) => {
                loadedCount++;

                var total = allResourcesBeingLoaded.length;
                var progressbar = document.getElementById('progressbar');
                var value = parseInt((loadedCount * 100.0) / total);
                var pct = value + '%';
                progressbar.style.width = pct;
                console.info(`${loadedCount}/${total} (${pct}): (${type}) ${filename}`);

                var progressLabel = document.getElementById('progressLabel');
                progressLabel.innerText = `$Downloading ${loadedCount}/${total}: (${type}) ${filename}`;
            });
            return fetchResources;
        }
    });
});
