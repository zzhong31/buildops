/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee(
    $id: ID
    $firstname: String
    $lastname: String
    $skills: AWSJSON
  ) {
    onCreateEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      skills: $skills
    ) {
      id
      firstname
      lastname
      skills
    }
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee(
    $id: ID
    $firstname: String
    $lastname: String
    $skills: AWSJSON
  ) {
    onUpdateEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      skills: $skills
    ) {
      id
      firstname
      lastname
      skills
    }
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee(
    $id: ID
    $firstname: String
    $lastname: String
    $skills: AWSJSON
  ) {
    onDeleteEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      skills: $skills
    ) {
      id
      firstname
      lastname
      skills
    }
  }
`;
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill($id: ID, $name: String) {
    onCreateSkill(id: $id, name: $name) {
      id
      name
    }
  }
`;
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill($id: ID, $name: String) {
    onUpdateSkill(id: $id, name: $name) {
      id
      name
    }
  }
`;
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill($id: ID, $name: String) {
    onDeleteSkill(id: $id, name: $name) {
      id
      name
    }
  }
`;
