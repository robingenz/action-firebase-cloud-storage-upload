# firebase-cloud-storage-upload-action

GitHub Action to upload a file to [Firebase Cloud Storage](https://firebase.google.com/products/storage).

## Usage

```yaml
- uses: robingenz/firebase-cloud-storage-upload-action@main
  with:
    # The destination path in Firebase Cloud Storage.
    # Required.
    destination: ''
    # The Firebase service account key in JSON format.
    # Required.
    firebaseServiceAccountKey: ''
    # The path to the file that should be uploaded.
    # Required.
    path: ''
    # The storage bucket name.
    # Required.
    storageBucket: ''
```

## Example

```yaml
name: Upload file to Firebase Cloud Storage
on:
  push:
    branches:
      - main
jobs:
  uplaod-file:
    runs-on: ubuntu-latest
    steps:
      - name: Upload file to Firebase Cloud Storage
        uses: robingenz/firebase-cloud-storage-upload-action@main
        id: upload-action
        with:
            destination: 'test/README.md'
            firebaseServiceAccountKey: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_KEY }}
            path: 'README.md'
            storageBucket: 'my-bucket.appspot.com'
      - name: Print download URL
        run: echo ${{ steps.upload-action.outputs.downloadUrl }}
```

## License

See [LICENSE](./LICENSE).

[^1]: This project is not affiliated with, endorsed by, sponsored by, or approved by Google LLC or any of their affiliates or subsidiaries. 
