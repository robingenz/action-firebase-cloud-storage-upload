import * as core from '@actions/core'
import { cert, initializeApp } from 'firebase-admin/app'
import { getDownloadURL, getStorage } from 'firebase-admin/storage'

export const run = async () => {
  const destination = core.getInput('destination', {
    required: true
  })
  const firebaseServiceAccountKey = core.getInput('firebaseServiceAccountKey', {
    required: true
  })
  const path = core.getInput('path', {
    required: true
  })
  const storageBucket = core.getInput('storageBucket', {
    required: true
  })

  let serviceAccountPathOrObject = firebaseServiceAccountKey
  try {
    serviceAccountPathOrObject = JSON.parse(firebaseServiceAccountKey)
  } catch (e) {
    // Ignore
  }

  initializeApp({
    credential: cert(),
    storageBucket: storageBucket
  })

  const bucket = getStorage().bucket()
  core.info(`Upload file...`)
  const uploadResponse = await bucket.upload(path, {
    destination
  })
  const file = uploadResponse[0]
  core.info(`Get download URL...`)
  const downloadUrl = await getDownloadURL(file)

  core.setOutput('downloadUrl', downloadUrl)

  core.info(`Upload successfully completed!`)
}
