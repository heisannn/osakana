import KanjiSplitter from "./kanjispliter"

type kanjiProps = {
  questionnum: number
  answerkanji: string
  yomikanji: string
  description: string
  isCorrect: boolean
}

export default function Kanji({ questionnum, answerkanji, yomikanji, description, isCorrect }: kanjiProps) {
  return (
    <div>
      {isCorrect ? (
        <div>true
          <div className="card bg-base-100 w-96 shadow-sm items-center m-3 bg-green-300 border-green-500">
            <div className="font-mono text-3xl my-1">{questionnum}</div>
            <figure className="h-50 flex justify-center items-center">
              <KanjiSplitter
                char={answerkanji}
                isHidden={!isCorrect}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl">{answerkanji}  {yomikanji}</h2>
              <p>{description}</p>
            </div>
          </div>

        </div>
      ) : (
        <div>
          false
          <div className="card bg-base-100 w-96 shadow-sm items-center m-3">
            <div className="font-mono text-3xl my-1">{questionnum}</div>
            <figure className="h-50 flex justify-center items-center">
              <KanjiSplitter
                char={answerkanji}
                isHidden={!isCorrect}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl">{yomikanji}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

