export default function (detailedScore = 0, action) {
    if (action.type == "saveDetailedScore") {
      return action.detailedScore;
    } else {
      return detailedScore;
    }
  }
  