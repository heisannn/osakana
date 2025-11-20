import Kanji from "../_components/ui/kanji";
export default function Mobile() {
  return (
    <div>
      <div className="flex flex-wrap">
        <Kanji
          questionnum={1}
          answerkanji="鮪"
          yomikanji="まぐろ"
          description="寿司や刺身で大人気な、大型の赤身魚。"
          isCorrect={true}
        />
        <Kanji
          questionnum={2}
          answerkanji="鰯"
          yomikanji="いわし"
          description="安くて栄養満点、食卓の定番である青魚。"
          isCorrect={false} />
      </div>

    </div>
  )

}
