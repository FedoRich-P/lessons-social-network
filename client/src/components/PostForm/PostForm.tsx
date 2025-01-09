import { FC } from 'react';
import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/Posts.ts';
import { queryClient } from '../../api/queryClient.ts';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IPostFormProps {}

const CreatePostSchema = z.object({
  text: z.string().min(10, 'Длина сообщения должны быть больше 10 символов'),
});

type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;

export const PostForm: FC<IPostFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostSchemaType>({
    resolver: zodResolver(CreatePostSchema),
  });

  const createPostMutation = useMutation(
    {
      mutationFn: createPost,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['posts'] }).then(() => {});
      },
    },
    queryClient
  );

  const onHandleSubmit: SubmitHandler<CreatePostSchemaType> = ({ text }) => {
    createPostMutation.mutate(text);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} className="post-form">
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea className="post-form__input" {...register('text')} />
      </FormField>

      {/*{errors && <span>{errors.text?.message}</span>}*/}

      <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending} />
    </form>
  );
};
