/* Total Area = area of first triangle - area of second triangle - area of intersecting part */
/* Area of triangle = x_distance * y_distance */

const overLappingArea = (l1, r1, l2, r2) => {
  let x = 0
  let y = 1
  /* Area for first reactangle */
  let area_1 = Math.abs(l1[x] - r1[x]) * Math.abs(l1[y] - r1[y])
  /* Area for second rectangle */
  let area_2 = Math.abs(l2[x] - r2[x]) * Math.abs(l2[y] - r2[y])
  // Length of intersecting part i.e start from max(l1[x], l2[x]) of x-coordinate and end at min(r1[x], r2[x]) x-coordinate by subtracting
  // start from end we get requiredlengths
  let x_dist = Math.min(r1[x], r2[x]) - Math.max(l1[x], l2[x])
  let y_dist = Math.min(r1[y], r2[y]) - Math.max(l1[y], l2[y])
  let intersecting_area = 0
  if (x_dist > 0 && y_dist > 0) intersecting_area = x_dist * y_dist
  /* area will be 0 if any of x_dist or y_dist is negative, that means reactangles don't intersect*/
  return area_1 + area_2 - intersecting_area
}

const normalizeAndCompare = () => {
  const obj = {}
  /* Normalize the list */
  let l = 1
  let r = 1
  for (let i = 0; i < list.length; i += 4) {
    obj[`l${l}`] = [+list[i], +list[i + 1]]
    obj[`r${r}`] = [+list[i + 2], +list[i + 3]]
    l++
    r++
  }
  /* Iterating and checking area for each reactangle */
  /* Result will 0 if any of the triangle don't overlap */
  /* Result will be total area of all intersecting rectangles if they overlap */
  let curr
  let next
  let res
  let area = 0
  for (let i = 1; i < list.length / 4; i++) {
    curr = i
    for (let j = i + 1; j < list.length / 4 + 1; j++) {
      next = j
      res = overLappingArea(
        obj[`l${curr}`],
        obj[`r${curr}`],
        obj[`l${next}`],
        obj[`r${next}`]
      )
      if (res === 0) {
        area = 0
        console.log(
          `\nReactangles ${curr} and ${next} don't overlap so Area = ${area}\n`
        )
        break
      }
      area += res
    }
  }
  return area
}

const list = [3, 5, 8, 9, 5, 6, 10, 11] // Changing values in this list will change the result
if (!!(list.length % 4)) {
  console.log(`\nPlease enter all the coordinates for the rectangle\n`)
} else {
  let area_ = normalizeAndCompare()
  if (!area_) return
  console.log(`\nArea of the intersection of all rectangles = ${area_}\n`)
}
