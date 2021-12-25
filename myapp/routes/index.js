var express = require("express");
var router = express.Router();

const json = require("../quotes.json");
var is_comma = false;
const Discourse = [
  "Concerted efforts from all parties is vital to resolve the many challenges brought by topic. ",
  "It is of paramount importance that we thoroughly investigate the causes and effects of topic. ",
  "topic continues to be a relevant controversial issue in society today. ",
  "Nevertheless,the discussion of topic still has a special significance. ",
  "To me, topic is not only a vital event, but is also capable of transforming many lives. ",
  "In the modern era, technology has become the driving force of the world. This has also changed how people view and discuss topic. ",
  "Within twenty years a fundamental paradigm shift had occurred in the ways in which informed observers discussed topic. ",
  "Considering the importance of topic, it is understandable that many people would be hesitant to make changes to the system. ",
  "The new fast pace of the digital age demands that we act quickly and accurately in guiding our views, discussions and actions when it comes to topic. ",
  "However, this is still not the most important question in our discussion about topic. ",
  "It is vital to examine the causes and effects of topic. ",
  "Many may argue that topic brings a net loss to our society. ",
  "One cannot dismiss the potential dangers of topic; however, one must always accept the responsibility for their actions. ",
  "So, how are we going to achieve topic? ",
  "Once we manage to comprehend the essence of topic, we will be able to resolve many problems. ",
  "What is the most important thing about topic? ",
  "How does topic occur? ",
  "To ask a rhetorical question, how does topic occur? ",
  "To ask a rhetorical question, why does topic occur? ",
  "Generally speaking, we have to consider many points of view about topic before forming our own opinions. ",
  "We need to think thoroughly about how topic affects our daily lives. ",
  "Completely understanding topic is the key to resolve our problems. ",
  "topic is of huge sigificance to us. ",
  "In the past, present and future, we think a lot about topic. ",
  "What are the possible scenarios when topic occurs or does not occur? ",
  "Under these circumstances, even the most intelligent minds have to exhaust every single possibility to find a solution for this problem. ",
  "This may sound cliché, but it is the truth. ",
  "In our lives, when the discussion of topic emerges, we have to adapt to the reality of its existence. ",
  "It is bona fide that topic has a special significance to modern society. ",
  "It is increasingly clear that the historical one size fits all approach to topic is outdated. ",
  "Sensing a need for change, many people began to push for new models for topic that would keep up with the times. ",
  "Therefore, ",
  "Hence, ",
  "Meanwhile, ",
  "Subsequently, ",
  "In my opinion, ",
  "Nevertheless, ",
  "Fortunately, ",
  "Unfortunately, ",
  "In my humble opinion, ",
  "Generally, ",
  "Specifically, ",
  "For instance, ",
  "For example, ",
  "To conclude, ",
  "Besides, ",
  "Moreover, ",
  "Furthermore, ",
  "After the discussions above, ",
  "From this point of view, ",
  "From another perspective, ",
  "On the other hand, ",
  "To sum up, ",
  "In a nutshell, ",
  "In an increasingly complex and competitive world, ",
  "Proponents of the idea believe that, ",
  "When analyzing the cost-benefit effects of topic, ",
  "Every individual inevitably has to face these problems. When handling these problems, ",
  "This may sound cliché, but when facing these situations, ",
];

const Start = [
  "once said, ",
  "often iterated that, ",
  "liked to put it this way, ",
  "observed that, ",
  "points out that, ",
  "emphasizes that, ",
  " remarks, ",
  "commented that, ",
  "stated that, ",
  "maintained that, ",
];

const End = [
  "This lead me into a deep thought. ",
  "By this, we have to look into this discussion with greater concern. ",
  "This quote inspired me a lot. ",
  "I hope that this quote will give some inspiration to the readers. ",
  "This observation demonstrated great wisdom. ",
  "It is worthwhile to think about how this observation relates to the topic discussed above. ",
  "Although this sentence is very short, it makes me ponder about it. ",
  "This answers many questions about the topic discussed above. ",
];

function lowerCaseFirstLetter(sentence) {
  return sentence.charAt(0).toLowerCase() + sentence.slice(1);
}
function choice(sentences) {
  let length = sentences.length;
  return sentences[Math.floor(Math.random() * length)];
}
function increase_paragraph(paragraph) {
  if (paragraph[paragraph.length - 1] === " ") {
    paragraph = paragraph.slice(0, -2);
  }
  return "\t" + paragraph + ".\n";
}

function get_quote(json_length = 1596, start_length = 10, end_length = 8) {
  sentence = "";
  quote = json[Math.floor(Math.random() * json_length)];
  sentence =
    quote["author"] +
    " " +
    Start[Math.floor(Math.random() * start_length)] +
    `"` +
    quote["text"] +
    `"` +
    " " +
    End[Math.floor(Math.random() * end_length)];
  return sentence;
}
function get_discourse(topic, length = 59, seperate = 31) {
  if (!is_comma) {
    let rand_num = Math.floor(Math.random() * length);
    sentence = Discourse[rand_num];
    sentence = sentence.replace(RegExp("topic", "g"), topic);

    if (rand_num >= seperate) {
      is_comma = true;
    }
    return sentence;
  }
  let rand_num = Math.floor(Math.random() * seperate);
  sentence = lowerCaseFirstLetter(Discourse[rand_num]);
  sentence = sentence.replace(RegExp("topic", "g"), topic);

  is_comma = false;
  return sentence;
}

function generate_essay(topic) {
  let essay = [];
  let paragraph = "";
  let essay_length = 0;
  while (essay_length < 8000) {
    let rand_num = Math.random() * 100;
    if (rand_num < 20 && paragraph.length > 300 && !is_comma) {
      paragraph = increase_paragraph(paragraph);
      essay.push(paragraph);
      paragraph = "";
    } else {
      if (rand_num < 30 && !is_comma) {
        var sentence = get_quote();
      } else {
        var sentence = get_discourse(topic);
      }
      essay_length = essay_length + sentence.length;
      paragraph = paragraph + sentence;
    }
  }
  paragraph = increase_paragraph(paragraph);
  essay.push(paragraph);
  essay = "<div>" + essay.join("</div><div>") + "</div>";
  return essay;
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/:topic", function (req, res) {
  res.send("index", { essay: generate_essay(req.params.topic) });
});
module.exports = router;
