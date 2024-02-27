type ProgressCallback = (output: string) => void

export async function runCwd(
  rName: string,
  onProgress: ProgressCallback
): Promise<string | false> {
  const res = await fetch(
    `/api?${new URLSearchParams({ name: rName })}`,
    {}
  )
  const reader = res.body?.getReader()

  if (reader) {
    return streamResponse(reader, onProgress)
  } else {
    return false
  }
}

async function streamResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onProgress: ProgressCallback
): Promise<string> {
  return await new Promise(resolve => {
    const decoder = new TextDecoder()
    let result = ''
    const readChunk = ({
      done,
      value
    }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        resolve(result)
        return
      }

      const output = decoder.decode(value)
      result += output
      onProgress(output)
      reader.read().then(readChunk)
    }

    reader.read().then(readChunk)
  })
}
