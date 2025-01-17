# take-home-assignment-A

## To run
1. In the home directory, run `npm install`
2. In the frontend directory, run `npm install` to install all new dependencies (e.g., styling library I used)
3. Run the docker container and generate the data records
4. In the frontend directory, run `npm run dev` to start the application

## What it does
The query management application displays a table of data relating to health questions. Users are able to create, resolve, and delete queries related to each question.
<img width="1164" alt="image" src="https://github.com/user-attachments/assets/7ddf2528-ff21-4bd6-9ec7-ff8aaecdce7e" />

### Considerations
User-accessibility: I used an external styling library to help me quickly make UI components. These UI components are navigable by keyboard users and automatically adher to web accessibility guidelines. 

## Technical details

### DB Schema
The models were created according to the requirements listed. For example, the query model:
```
model Query {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  title       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  status      Status
  formDataId  String   @unique @db.Uuid
  formData    FormData @relation(fields: [formDataId], references: [id])

  @@map("queries")
}
```
A one-to-one relationship exists to link the Query and FormData model together. A one-to-one relationship was used as one form data entry can only have 1 single associated query. 

### API Endpoints
**CREATE**
Create a new query by sending a POST request to `http://127.0.0.1:8080/queries` with a body containing title, description, status, and associated form data id.
<br/>
**UPDATE**
Update an existing query by sending a PUT request to `http://127.0.0.1:8080/queries/{queryId}` to change status from OPEN -> RESOLVED.
<br/>
**DELETE**
Delete a query by using the query id to send a DELETE request to `http://127.0.0.1:8080/queries/{queryId}`. 

### Frontend
To develop the frontend, I used Next.js and the Mantine styling library. 

## Next steps
I was running low on time because I am currently in exam season as I am doing a study abroad in the UK. As a result, if I had more time, this is what I would change:
- To improve scalability if there were thousands of records, pagination can be introduced to only fetch a certain amount of data at once. Another thing is that each time an update is performed, I make a GET request to fetch the form data. However, instead of making requests each time, I could just perform a filter as there is no change in data size.
- Include more comments explaining the work to help new developers understand the code
- Create tests (e.g., snapshot tests, endpoint tests)
