# imp

internet movie piss bot

## how-to

  - cp config.template.js config.js
  - vim config.js
  - npm install
  - npm run bot

## usage

  - no args returns a random imdb entry
  - otherwise it searches by title
  - filters you can use are:
    * -movie
    * -series
    * -episode

## examples

### search everything
`botname foo`

```
<bot> To Wong Foo Thanks for Everything, Julie Newmar (PG-13, 1995, Beeban
      Kidron, Comedy, Drama, 6.4 41%) Three drag queens travel cross-country
      until their car breaks down, leaving them stranded in a small town.
      https://imdb.com/title/tt0114682
```

### search by series
`botname foo -series`
```
<bot> Foo-Foo (N/A, 1960–, N/A, Animation) N/A
      https://imdb.com/title/tt0145608
```

### random result
`botname` (random)

```
<bot> Gene's Best Friend (N/A, 2008, Adam Freeman, Adam Reed, Reality-TV)
      Pressure is mounting in the days leading up to Gene's impending lie
      detector test on the "Adam Carolla Show" as he not only has a KISS show
      to prepare for, but his best friend and loyal canine Snippy goes
      missing. https://imdb.com/title/tt1210951
```
