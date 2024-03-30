# Clean Architecture

Clean Architecture is a software design paradigm that emphasizes separation of concerns and maintainability by structuring systems into layers where each layer serves a specific purpose and is independent of implementation details. At its core, Clean Architecture advocates for decoupling business logic from frameworks, databases, and other external dependencies, promoting testability, flexibility, and scalability. The architecture typically consists of concentric layers, with the innermost layer containing entities representing business objects and use cases, surrounded by layers for interfaces, application logic, and external frameworks or drivers. This approach encourages a clear separation of concerns, making it easier to understand, modify, and extend software systems over time.

![Clean Architecture](./docs/images/clean-arch.svg)

## Architectural Limits

Clean Architecture defines architectural boundaries that separate the core business logic from external concerns such as frameworks, databases, and user interfaces. These boundaries establish clear distinctions between different layers of the system, ensuring that each layer has a specific responsibility and is decoupled from implementation details. By enforcing architectural limits, Clean Architecture promotes modularity, testability, and maintainability, making it easier to evolve and extend software systems over time.

## Inputs and Outputs

Clean Architecture distinguishes between inputs and outputs to define the flow of data and interactions within the system. Inputs represent requests or commands that trigger specific actions or operations, while outputs represent responses or results that are returned to the user or external systems. By separating inputs and outputs, Clean Architecture ensures that business logic remains independent of external concerns and can be easily tested and modified without affecting the rest of the system.

An API request, for example, can be considered as an input that must traverse through the innermost layer of the system, where the business logic is situated. It passes through each layer of the system before the response, as an output, travels back through all the layers in the opposite direction.

**Request:** Web -> Controller -> Use Case -> Entity

**Response:** Entity -> Use Case -> Controller -> Web

## Use Cases

Use Cases are a fundamental component of Clean Architecture, they represent distinct functionalities or features that the system provides to its users. Use Cases encapsulate the business logic of the application, defining how users interact with the system to achieve specific goals or perform actions. In other words they represent the intent of the user and the corresponding response from the system.

### Characteristics of Use Cases in Clean Architecture:

- **Independence:** Each use case is independent of the infrastructure, frameworks, and external dependencies. This ensures that the business logic remains isolated and easily testable without being tightly coupled to implementation details. _Keep options open_.

- **Single Responsibility:** Use Cases adhere to the Single Responsibility Principle (SRP), focusing on a specific task or functionality within the system. This granularity facilitates easier maintenance, testing, and modifications.

- **Input and Output:** Use Cases define clear inputs (requests or commands) and outputs (responses or results) that enable communication with the external layers. This separation ensures that use cases remain agnostic of the presentation or data access mechanisms.

- **Encapsulation of Business Rules:** Business rules and domain logic are encapsulated within the use cases, ensuring that they are centrally managed and consistent across the application. This promotes a clear separation of concerns and enhances the maintainability of the system.

## DTO (Data Transfer Object)

Data Transfer Objects (DTOs) are used to transfer data between different layers of the system, such as the presentation layer, application layer, and data access layer. DTOs encapsulate data and provide a structured format for exchanging information, enabling seamless communication between components without exposing internal details. By defining DTOs with specific attributes and properties, Clean Architecture ensures that data is transferred efficiently and consistently across different layers of the system.

> 🚨 DTOs are typically anemic objects that contain only data and no behavior, this means they will not validate themselves or perform any operations.

## Presenters

Presenters are responsible for formatting and presenting data to the user in a specific format or layout. They encapsulate the logic for transforming raw data into a user-friendly representation, such as JSON, or XML. By separating presentation logic from business logic, Clean Architecture ensures that the system remains flexible and adaptable to different user interfaces and output formats.

Example:

```
input = new CategoryInputDTO("name");
output = CreateCategoryUseCase.execute(input);
jsonResult = new CategoryPresenter(output).toJson();
xmlResult = new CategoryPresenter(output).toXml();
```

## What's the difference between Clean Architecture Entities and DDD Entities?

Clean Architecture defines Entities as a layer that holds the enterprise and business rules and DDD defines it as something unique within a specific domain. In summary, while both Clean Architecture and DDD emphasize the importance of entities as central to the business logic, Clean Architecture entities tend to be more focused on purity and independence from technical concerns, whereas DDD entities are deeply integrated with the domain model and express domain-specific behaviors and relationships.

Also, it is important to mention that there is nothing blocking you from applying Domain Driven Design concepts within Clean Architecture, in fact, they can be complementary. Therefore, we could understand Clean Architecture Entities layer as the place where we put Aggregates, Domain Services, Domain Events, and Domain Entities.

## Notification Pattern

The Notification Pattern is a design pattern used to communicate errors, warnings, and other messages between different layers of the system. It allows components to send notifications to other components without having to know the details of the recipient.
